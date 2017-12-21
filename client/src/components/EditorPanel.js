import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import Editor from "../containers/Editor";

import "../assets/css/EditorPanel.css";

class EditorPanel extends React.Component {
    render() {
        const {
            canDiscardAll,
            query,
            onRunQuery,
            onUpdateQuery,
            onClearQuery,
            onDiscardAllFrames,
            saveCodeMirrorInstance,
            connection,
            url,
            onUpdateAction,
            onRefreshConnectedState,
            openChangeUrlModal
        } = this.props;

        const connected = connection.connected;
        const shouldPrompt = connection.shouldPrompt;
        const refreshing = connection.refreshing;
        const isQueryDirty = query.trim() !== "";

        return (
            <div className="editor-panel">
                <div className="header">
                    <div
                        className={classnames("status", {
                            refreshing,
                            connected: !refreshing && connected,
                            "not-connected": !refreshing && !connected
                        })}
                    >
                        <i className="fa fa-circle status-icon" />
                        <span className="status-text">
                            {refreshing ?
                                "Refreshing (" + url.url + ")" :
                                (connected ? "Connected (" + url.url + ")" : "Not connected (" + url.url + ")")
                            }
                        </span>
                        <span style={{
                            marginLeft: "2px"
                        }}>
                            {(connected || !shouldPrompt) ? null : <button
                                className="btn btn-default btn-xs"
                                onClick={e => {
                                    e.preventDefault();

                                    onRefreshConnectedState();
                                }}
                                style={{
                                    marginLeft: "10px"
                                }}
                            >
                                { connection.refreshing ? "Reconnecting..." : "Reconnect" }
                            </button>}
                            <a
                                href="#"
                                className="btn btn-primary btn-xs"
                                onClick={e => {
                                    e.preventDefault();

                                    openChangeUrlModal();
                                }}
                                style={{
                                    marginLeft: "10px"
                                }}
                            >
                                Change URL
                            </a>
                        </span>
                    </div>
                    <div className="actions">
                        <a
                            href="#"
                            className={classnames("action clear-btn", {
                                actionable: canDiscardAll
                            })}
                            onClick={e => {
                                e.preventDefault();

                                /* eslint-disable no-restricted-globals */
                                if (confirm("Are you sure? This will close all frames.")) {
                                    onDiscardAllFrames();
                                }
                                /* eslint-enable no-restricted-globals */
                            }}
                        >
                            <i className="fa fa-trash" /> Close all
                        </a>
                        <a
                            href="#"
                            className={classnames("action clear-btn", {
                                actionable: isQueryDirty
                            })}
                            onClick={e => {
                                e.preventDefault();
                                if (query === "") {
                                    return;
                                }

                                onClearQuery();
                            }}
                        >
                            <i className="fa fa-close" /> Clear
                        </a>
                        <a
                            href="#"
                            className={classnames("action run-btn", {
                                actionable: isQueryDirty
                            })}
                            onClick={e => {
                                e.preventDefault();
                                if (query === "") {
                                    return;
                                }

                                onRunQuery(query, this.props.action);
                            }}
                        >
                            <i className="fa fa-play" /> Run
            </a>
                    </div>
                </div>

                <Editor
                    onUpdateQuery={onUpdateQuery}
                    onRunQuery={onRunQuery}
                    query={query}
                    action={this.props.action}
                    saveCodeMirrorInstance={saveCodeMirrorInstance}
                />
                <div className="editor-radio">
                    <label className="editor-label">
                        <input
                            className="editor-type"
                            type="radio"
                            name="action"
                            value="query"
                            checked={this.props.action === "query"}
                            onChange={onUpdateAction}
                        />Query
          </label>
                    <label className="editor-label">
                        <input
                            className="editor-type"
                            type="radio"
                            name="action"
                            value="mutate"
                            checked={this.props.action === "mutate"}
                            onChange={onUpdateAction}
                        />Mutate
          </label>
                    <label className="editor-label">
                        <input
                            className="editor-type"
                            type="radio"
                            name="action"
                            value="alter"
                            checked={this.props.action === "alter"}
                            onChange={onUpdateAction}
                        />Alter
          </label>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.query.query,
        action: state.query.action
    };
}

export default connect(mapStateToProps)(EditorPanel);
