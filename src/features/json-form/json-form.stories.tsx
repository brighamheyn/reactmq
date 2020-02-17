import React from 'react';

import JsonForm from '.';

import '../../style.scss';

export default { title: "JsonForm" };

export const withString = () => <JsonForm data={"Hello world"}/>

export const withNumber = () => <JsonForm data={3}/>

export const withBoolean = () => <JsonForm data={true}/>

export const withArray = () => <JsonForm data={[1, "two", false, 3.14]}/>

export const withObject = () => <JsonForm data={{one: 1, two: "two", false: false, pi: 3.14}} />

export const withComplexArray = () => <JsonForm data={[1, [2, ["three", 4, 5], 6, "seven", [8, [9]]], "ten"]} />

export const withComplexObject = () => <JsonForm data={{one: 1, two: {three: "three", four: 4, five: false}, six: 6, seven: "seven", eight: {nine: 9}, ten: "ten"}} />