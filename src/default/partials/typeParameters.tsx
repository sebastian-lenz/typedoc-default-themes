import {With, IfCond, IfNotCond, Markdown} from '../../lib';
import React from 'react';
export const component = (props, item = props) => <><ul className="tsd-type-parameters">
    {props.typeParameters.map((item, i) => <>        <li>
            <h4><Compact>
                {item.name}
            {Boolean(item.type) && <>                    <span className="tsd-signature-symbol">: </span>
                    { With(item || props, (item || props).type, (superProps, props, item) => (<>{item.__partials__.type}</>)) }
            </>}{Boolean(item.default) && <>                     = { With(item || props, (item || props).default, (superProps, props, item) => (<>{item.__partials__.type}</>)) }
            </>}            </Compact></h4>
            {item.__partials__.comment}
        </li>
    </>)}</ul>
</>;
