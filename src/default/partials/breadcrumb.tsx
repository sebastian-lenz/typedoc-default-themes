import { With, __partials__, Compact, IfCond, IfNotCond, Markdown } from "../../lib";
import React from "react";
export const breadcrumb = (props) =>
    props.parent ? (
        <>
            {" "}
            {With(props, props.parent, (superProps, props) => (
                <>{__partials__.breadcrumb(props)}</>
            ))}
            <li>
                {!!props.url ? (
                    <>
                        {" "}
                        <a href={props.relativeURL}>{props.name}</a>
                    </>
                ) : (
                    <>
                        {" "}
                        <span>{props.name}</span>
                    </>
                )}{" "}
            </li>
        </>
    ) : (
        !!props.url && (
            <>
                {" "}
                <li>
                    <a href={props.relativeURL}>{props.name}</a>
                </li>
            </>
        )
    );
