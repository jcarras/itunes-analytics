import { AppStoreItemsDataSet } from './app-store-items-dataset';
import { HeatMapUpdate } from 'src/shared/types';

const getTestHeatMapUpdates = () : HeatMapUpdate[] => {
    const updates: HeatMapUpdate[] = [];
    // update items 2, 4, and 6 for demo purposes
    const testIds = [2,4,6];
    const testId = testIds[getRandomInt(0,2)];
    updates.push({id: testId, points: [getTestDataPoint()]});
  
    // randomly update all the other items
    for(let i = 0; i < 25; i++) {
      updates.push({id: getRandomItemId(), points: [getTestDataPoint()]});
    }
    return updates;
  }
  
  const getTestDataPoint = ()=> {
    return {
      x: getRandomInt(50, 80),
      y: getRandomInt(50, 80)
    };
  }
  
  const getRandomInt = (min, max)=> {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  const getRandomItemId = ()=> {
    return getRandomInt(0, AppStoreItemsDataSet.length - 1);
  }

  export { getTestHeatMapUpdates, getTestDataPoint, getRandomInt, getRandomItemId};