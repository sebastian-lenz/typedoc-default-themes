import {With, IfCond, IfNotCond, Markdown} from '../../lib';
import React from 'react';
export const component = (props, item = props) => Boolean(props.tryGetTargetReflectionDeep) ? <>    { With(item || props, (item || props).tryGetTargetReflectionDeep, (superProps, props, item) => (<>
        <IfCond cond="superProps.name '===' name">
            Re-exports <a href={props.relativeURL}>{props.name}</a>
        </IfCond>
        <IfNotCond cond="superProps.name '===' name">
      {Boolean(props.flags.isExported) ? <>                Renames and re-exports <a href={props.relativeURL}>{props.name}</a>
      </> : <>                Renames and exports <a href={props.relativeURL}>{props.name}</a>
      </>}        </IfNotCond>
    </>)) }
</> : <>    Re-exports {props.name}
</>;
