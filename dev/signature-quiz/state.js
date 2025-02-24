// state.js
import constants from './constants.js';

const state = {
    currentLanguage: constants.LANGUAGE_JAPAN,
    isVerticalTable: true,
    isPoints: true, 
    setCurrentLanguage: function (language) {
        currentLanguage = language;
    }
}
export default state;