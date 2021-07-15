import {With, IfCond, IfNotCond, Markdown} from '../../lib';
import React from 'react';
export const component = (props, item = props) => <><section className={"tsd-panel tsd-member " + props.cssClasses}>
    <a name={props.anchor} className="tsd-anchor"></a>
    {Boolean(props.name) && <>        <h3>{props.flags.map((item, i) => <><span className={"tsd-flag ts-flag" + item}>{item}</span> </>)}{props.wbr}</h3>
    </>}
    {Boolean(props.signatures) ? <>        {props.__partials__.member.signatures}
    </> : Boolean(props.hasGetterOrSetter) ? <>
        {props.__partials__.member.getterSetter}
    </> : Boolean(props.tryGetTargetReflectionDeep) ? <>
        {props.__partials__.member.reference}
    </> : <>        {props.__partials__.member.declaration}
    </>}

    {!Boolean(props.isContainer) && props.groups.map((item, i) => <>{item.children.map((item, i) => <>{!Boolean(item.hasOwnDocument) && <>                    {item.__partials__.member}
        </>}</>)}</>)}</section>

  {Boolean(props.isContainer) && <>    {props.__partials__.index}
    {props.__partials__.members}
  </>}</>;
