// import {createIconSet} from 'react-native-vector-icons';
// import glyphMap from './iconfonts.json';
//
// const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');
//
// export default iconSet;
//
// export const Button = iconSet.Button;
// export const TabBarItem = iconSet.TabBarItem;
// export const TabBarItemIOS = iconSet.TabBarItemIOS;
// export const ToolbarAndroid = iconSet.ToolbarAndroid;
// export const getImageSource = iconSet.getImageSource;
import * as React from 'react';
import glyphMap from './iconfonts.json';

import { createIconSet } from '@expo/vector-icons';

const expoAssetId = require("./iconfont.ttf");
const Icon = createIconSet(glyphMap, 'FontName', expoAssetId);

export default Icon;
