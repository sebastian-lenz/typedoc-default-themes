import { With, relativeURL, wbr, __partials__, Compact, IfCond, IfNotCond, Markdown } from "../../lib";
import React from "react";
import { DeclarationReflection } from "../../../typedoc/src";
export const index = (props: DeclarationReflection) =>
    props.categories ? (
        <>
            {" "}
            <section className="tsd-panel-group tsd-index-group">
                <h2>Index</h2>
                <section className="tsd-panel tsd-index-panel">
                    <div className="tsd-index-content">
                        {props.categories.map((item, i) => (
                            <>
                                {" "}
                                <section className="tsd-index-section">
                                    <h3>{item.title}</h3>
                                    <ul className="tsd-index-list">
                                        {item.children.map((item, i) => (
                                            <>
                                                {" "}
                                                <li className={item.cssClasses}>
                                                    <a href={relativeURL(TODO)} className="tsd-kind-icon">
                                                        {!!item.name ? wbr(TODO) : <em>{wbr(TODO)}</em>}
                                                    </a>
                                                </li>
                                            </>
                                        ))}{" "}
                                    </ul>
                                </section>
                            </>
                        ))}{" "}
                    </div>
                </section>
            </section>
        </>
    ) : (
        !!props.groups && (
            <>
                {" "}
                <section className="tsd-panel-group tsd-index-group">
                    <h2>Index</h2>
                    <section className="tsd-panel tsd-index-panel">
                        <div className="tsd-index-content">
                            {props.groups.map((item, i) => (
                                <>
                                    {" "}
                                    <section className={"tsd-index-section " + item.cssClasses}>
                                        {!!item.categories ? (
                                            item.categories.map((item, i) => (
                                                <>
                                                    {" "}
                                                    <h3>
                                                        {!!item.title && <>{item.title} </>}
                                                        {item.superProps.title}
                                                    </h3>
                                                    <ul className="tsd-index-list">
                                                        {item.children.map((item, i) => (
                                                            <>
                                                                {" "}
                                                                <li className={item.cssClasses}>
                                                                    <a
                                                                        href={relativeURL(TODO)}
                                                                        className="tsd-kind-icon"
                                                                    >
                                                                        {!!item.name ? wbr(TODO) : <em>{wbr(TODO)}</em>}
                                                                    </a>
                                                                </li>
                                                            </>
                                                        ))}{" "}
                                                    </ul>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                {" "}
                                                <h3>{item.title}</h3>
                                                <ul className="tsd-index-list">
                                                    {item.children.map((item, i) => (
                                                        <>
                                                            {" "}
                                                            <li className={item.cssClasses}>
                                                                <a href={relativeURL(TODO)} className="tsd-kind-icon">
                                                                    {!!item.name ? wbr(TODO) : <em>{wbr(TODO)}</em>}
                                                                </a>
                                                            </li>
                                                        </>
                                                    ))}{" "}
                                                </ul>
                                            </>
                                        )}{" "}
                                    </section>
                                </>
                            ))}{" "}
                        </div>
                    </section>
                </section>
            </>
        )
    );
