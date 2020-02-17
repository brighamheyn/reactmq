import React, { useState, useRef, useEffect, useContext } from 'react';
import { stringify } from 'querystring';
import { on } from 'cluster';

const isObject = (value: any) => value !== null && ((typeof value === 'function') || (typeof value === 'object'));

const isArray = Array.isArray;

const isString = (value: any) => typeof value === 'string'

const isNumber = (value: any) => !isNaN(value) && (typeof value === 'string' ? "" !== value.trim() : true)

const setNested = (target: {[key: string]: any}, path: string, value: any): {[key: string]: any} => {

    let route = path.split(".");

    if (0 === route.length) {
        return target;
    }

    if (1 === route.length) {
        target[route[0]] = value;
        return target;
    } 

    target[route[0]] = {};

    return setNested(target[route[0]], route.slice(1).join('.'), value);
}

const JsonForm: React.FC<{data: any, onChange?: (patch: {[key: string]: any}) => void}> = ({data, onChange}) => {

    if (!isObject(data) && !isArray(data)) {
        data = {value: data};
    }

    const bubbleChange = (path: string, value: any) => {
        let patch = setNested({}, path, value);
        onChange && onChange(patch);
    }

    const parse = (key: any, pkey: any, parent: any, nodes: any[] = [], offset: number = 0) => {

        let path = `${pkey.replace('.value', '')}.${key}`.substring(1);

        let nkey = pkey + "." + key;

        let current = parent[key];
        let label = isArray(parent) ? `${key}` : key;

        let jsonKey = isArray(parent) ? <JsonArrayKey value={label} /> : <JsonObjectKey value={label} /> 

        if (isArray(current)) {
            if (offset > 0) {
                let n = <div key={path} className="flex-row" style={{marginLeft: `${offset}px`}}>{jsonKey}{": ["}</div>
                nodes.push(n);
            } else {
                nodes.push(<div key={"+" + path} style={{marginLeft: `${offset}px`}}>{"["}</div>);
            }

            for (let key = 0; key < current.length; key++) {
                parse(key, nkey, current, nodes, offset + 20);
            }

            nodes.push(<div key={"-" + path} style={{marginLeft: `${offset}px`}}>{"]"}</div>);
        }
        else if (isObject(current)) {
            if (offset > 0) {
                let n = <div key={path} className="flex-row" style={{marginLeft: `${offset}px`}}>{jsonKey}{": {"}</div>
                nodes.push(n);
            } else {
                nodes.push(<div key={"+" + path} style={{marginLeft: `${offset}px`}}>{"{"}</div>);
            }

            Object.keys(current).forEach(key => {
                parse(key, nkey, current, nodes, offset + 20);
            });

            nodes.push(<div key={"-" + path} style={{marginLeft: `${offset}px`}}>{"}"}</div>);
        }
        else if (isNumber(current)) {

            let node = 
                <div key={path} className="flex-row" style={{marginLeft: offset}}>
                    {jsonKey}
                    <div className="m-r-10">:</div>
                    <JsonNumber path={path} value={current} />
                </div>

            nodes.push(node);
        }
        else if (isString(current)) {

            let node = 
                <div key={path} className="flex-row" style={{marginLeft: offset}}>
                    {jsonKey}
                    <div className="m-r-10">:</div>
                    <JsonString path={path} value={current} onChange={bubbleChange}/>
                </div>

            nodes.push(node);
        }
        else if (typeof current === 'boolean') {

            let node = 
                <div key={path} className="flex-row" style={{marginLeft: offset}}>
                    {jsonKey}
                    <div className="m-r-10">:</div>
                    <JsonBoolean path={path} value={current} />
                </div>

            nodes.push(node);
        }

        return nodes;
    };

    let nodes = parse('value', '', {value: {...data}});

    return (
        <div className="flex-col min-h-100 font-mono">
            {nodes}
        </div>
    );
}   

export const ContentEditable: React.FC<{content: string, onChange: (content: string) => void | null}> = ({content, onChange}) => {

    const self: any = useRef(null);

    const [cursorPosition, setCursorPosition] = useState(0);

    const preserveCursorPosition = () => {

        let range: Range
        let position: number = 0;

        let selection = document.getSelection();
        
        if (selection?.rangeCount) {
            range = selection.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode === self.current) {
                position = range.endOffset;
            }
        }

        setCursorPosition(position);
    }

    const moveCursor = () => {
        preserveCursorPosition();
    }

    const change = () => {
        preserveCursorPosition();
        
        let content = self.current.innerText;
        onChange && onChange(content);
    }

    // set cursor position of contenteditable
    useEffect(() => {
        let selection = document.getSelection();
        selection?.collapse(self.current.lastChild, cursorPosition);
    })

    return (
        <span ref={self} onFocus={moveCursor} contentEditable={true} onInput={change} onChange={change} dangerouslySetInnerHTML={{__html: content}}></span>
    );
}

export const JsonArrayKey: React.FC<{value: string}> = ({value, children}) => {
    return (
        <div className="flex-row">
            <div className="text-teak">{value}</div>
            {children}
        </div>
        
    );
}

export const JsonObjectKey: React.FC<{value: string}> = ({value, children}) => {
    return (
        <div className="flex-row">
            <div className="text-brick-red">"{value}"</div>
            {children}
        </div>
        
    );
}

export const JsonNumber: React.FC<{path: string, value: string}> = ({path, value}) => {

    const [text, setText] = useState(value);

    return (
        <div className="text-deep-sapphire">
            <ContentEditable content={text} onChange={(text) => setText(text)}/>
            <input className="none" type="number" readOnly value={text} />
        </div>
    );
}

export const JsonString: React.FC<{path: string, value: string, onChange?: (path: string, value: string) => void}> = ({path, value, onChange}) => {

    const bubbleChange = (value: string) => {
        onChange && onChange(path, value);
    }

    return (
        <div className="text-mountain-meadow">
            "<ContentEditable content={value} onChange={(value) => bubbleChange(value)}/>"
            <input className="none" type="text" readOnly value={value} />
        </div>
    );
}

export const JsonBoolean: React.FC<{path: string, value: boolean}> = ({path, value}) => {
    return (
        <div className="text-denim">
            {value}
        </div>
    );
}

export default JsonForm;