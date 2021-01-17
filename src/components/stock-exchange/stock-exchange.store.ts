import Model from './stock-exchange.model';
import genericValidators from '../../utils/generic-validators.utils';
import customValidators from './stock-exchanges.validators';
import { v4 as uuidv4 } from "uuid";
import { IMarketValue, IStockExchange, TStockExchangeSearch } from './stock-exchange.interface';

const create = async (iStockExchange: IStockExchange): Promise<IStockExchange | null> => {
  try {
    if (await isValid(iStockExchange)) {
      const model = await getModel(iStockExchange);
      const stockExchange: any = await model.save();
      if (stockExchange) {
        return entityResult(stockExchange);
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

const get = async (search: TStockExchangeSearch) => {
  try {
    const stockExchange: any = await Model.findOne({ active: true }).and([search]).exec();
    if (stockExchange) {
      return entityResult(stockExchange);
    }
    return null;
  } catch (error) {
    return null;
  }
};


const list = async (query: any) => {
  try {
    const { names, symbols, skip, limit } = getFilters(query);

    const stockExchanges: any[] = await Model
      .find({ active: true })
      .and([{ $or: names }])
      .and([{ $or: symbols }])
      .skip(skip)
      .limit(limit)
      .exec();

    if (stockExchanges) {
      const result: IStockExchange[] = [];
      const length = await Model
        .find({ active: true })
        .and([{ $or: names }])
        .and([{ $or: symbols }])
        .countDocuments()
        .exec();

      stockExchanges.forEach(se => {
        result.push({ ...se._doc });
      });

      return { length, stockExchanges: result };
    }
    return { length: 0, stockExchanges: [] };
  } catch (error) {
    return { length: 0, stockExchanges: [] };
  }
};

const patch = async (_id: string, iStockExchange: Partial<IStockExchange>): Promise<boolean> => {
  try {
    const stockExchange = await get({ _id });
    if (stockExchange && await isPartialValid(iStockExchange)) {
      beforeUpdate(iStockExchange);
      await Model.updateOne({ _id }, iStockExchange).exec();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const remove = async (_id: string) => {
  try {
    const stockExchange = await get({ _id });
    if (stockExchange) {
      await Model.updateOne({ _id }, { active: false, modified: new Date() }).exec();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const isValid = async (iStockExchange: IStockExchange): Promise<boolean> => {
  const errors: string[] = [];
  genericValidators.form.textField("Name", iStockExchange.name, errors);
  genericValidators.form.textArea("Description", iStockExchange.description, errors);
  genericValidators.form.textField("Symbol", iStockExchange.name, errors);
  customValidators.marketValue.elements(iStockExchange.market_values, errors);
  await customValidators.symbol.unique(iStockExchange.symbol, errors);
  return errors.length === 0;
};

const isPartialValid = async (iStockExchange: Partial<IStockExchange>) => {
  const errors: string[] = [];
  const keys = Object.keys(iStockExchange);

  await Promise.all(
    keys.map(async (key: string) => {
      switch (key) {
        case "name":
          genericValidators.form.textField("Name", iStockExchange.name as string, errors);
          break;
        case "description":
          genericValidators.form.textArea("Description", iStockExchange.description as string, errors);
          break;
        case "symbol":
          genericValidators.form.textField("Symbol", iStockExchange.name as string, errors);
          await customValidators.symbol.update(iStockExchange.symbol as string, errors);
          break;
        case "market_values":
          customValidators.marketValue.elements(iStockExchange.market_values as IMarketValue[], errors);
          break;
      }
    })
  );

  return errors.length === 0;
};

const getModel = async (iStockExchange: IStockExchange) => {
  await beforeCreate(iStockExchange);
  return new Model({ ...iStockExchange });
}

const entityResult = (stockExchange: any): IStockExchange => {
  const result: IStockExchange = { ...stockExchange._doc };
  return result;
}

const beforeCreate = async (iStockExchange: IStockExchange) => {
  iStockExchange._id = await getValidUUID();
  iStockExchange.created = new Date();
  iStockExchange.modified = new Date();
};

const getValidUUID = async () => {
  let isValid = false;
  let uuid = "";

  while (!isValid) {
    uuid = uuidv4();
    isValid = await get({ _id: uuid }) === null;
  }

  return uuid;
}

const beforeUpdate = (iStockExchange: Partial<IStockExchange>) => {
  delete iStockExchange._id;
  iStockExchange.modified = new Date();
};

const getFilters = (query: any) => {
  const keys = Object.keys(query);
  const filters = {
    names: [] as any[],
    symbols: [] as any[],
    // and: false,
    skip: 0,
    limit: 0,
  };

  filters.skip = Number(query['skip'] || 0);
  filters.limit = Number(query['limit'] || 24);
  // TODO: Implementar AND y OR en el query
  // filters.and = Number(query['and']) === 1 || false;

  if (keys.length > 0) {
    keys.forEach(key => {
      switch (key) {
        case "name":
          // TODO:Implementar búsqueda like
          filters.names.push({ name: query[key] });
          break;
        case "symbol":
          query[key].forEach((symbol: string) => {
            filters.symbols.push({ symbol });
          });
          break;
      }
    });
  } else {
    filters.names = [{}];
    filters.symbols = [{}];
  }

  return filters;
};
export default { create, get, list, patch, remove };