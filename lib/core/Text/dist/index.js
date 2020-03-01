'use strict';function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var React=_interopDefault(require("react")),PropTypes=_interopDefault(require("prop-types"));function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}var cm={text:"_src_Text_module__text","size-xs":"_src_Text_module__size-xs","size-s":"_src_Text_module__size-s","size-m":"_src_Text_module__size-m","size-l":"_src_Text_module__size-l","size-xl":"_src_Text_module__size-xl","size-xxl":"_src_Text_module__size-xxl","size-xxxl":"_src_Text_module__size-xxxl","size-xxxxl":"_src_Text_module__size-xxxxl","weight-regular":"_src_Text_module__weight-regular","weight-medium":"_src_Text_module__weight-medium","weight-bold":"_src_Text_module__weight-bold","color-red":"_src_Text_module__color-red","color-green":"_src_Text_module__color-green","color-grey":"_src_Text_module__color-grey"};function createCommonjsModule(a,b){return b={exports:{}},a(b,b.exports),b.exports}var classnames=createCommonjsModule(function(a){/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ /* global define */(function(){function b(){for(var a,d=[],e=0;e<arguments.length;e++)if(a=arguments[e],a){var f=typeof a;if("string"===f||"number"===f)d.push(a);else if(Array.isArray(a)&&a.length){var g=b.apply(null,a);g&&d.push(g)}else if("object"===f)for(var h in a)c.call(a,h)&&a[h]&&d.push(h)}return d.join(" ")}var c={}.hasOwnProperty;a.exports?(b.default=b,a.exports=b):window.classNames=b})()}),Text=function(a){var b,c=a.text,d=a.size,e=a.weight,f=a.theme,g=a.color,h=a.className,i=a.style,j=a.children,k=_objectWithoutProperties(a,["text","size","weight","theme","color","className","style","children"]);return React.createElement("span",_extends({className:classnames(cm.text,(b={},_defineProperty(b,cm["size-".concat(d.toLowerCase())],!!d),_defineProperty(b,cm["weight-".concat(e.toLowerCase())],!!e),_defineProperty(b,cm["theme-".concat(f.toLowerCase())],!!f),_defineProperty(b,cm["color-".concat(g&&g.toLowerCase())],!!g),b),h),style:i},k),j||c)};Text.propTypes={/** Текст */text:PropTypes.node,/** Размер текста: s, m, l. Передается детям */size:PropTypes.oneOf(["xs","s","m","l","xl","xxl","xxxl","xxxxl"]),/** Жирность текста: regular, medium, bold */weight:PropTypes.oneOf(["regular","medium","bold"]),/** Тема: light */theme:PropTypes.oneOf(["light"]),/** Цвет: red, grey */color:PropTypes.oneOf(["red","grey","green"]),/** Дополнительные стили */className:PropTypes.oneOfType([PropTypes.string,PropTypes.object]),/** Инлайновые стили */style:PropTypes.object},Text.defaultProps={size:"m",weight:"regular",theme:"light"},module.exports=Text;