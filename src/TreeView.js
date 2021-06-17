import React from 'react';
import './TreeView.css'

class TreeView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: props.defaultCollapsed
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
    }

    handleClick() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    handleLabelClick(...args) {
        if (this.props.labelClick) {
            this.props.labelClick(...args)
        }
    }

    render() {
        const {
            collapsed = this.state.collapsed,
            className = '',
            itemClassName = '',
            treeViewClassName = '',
            childrenClassName = '',
            nodeLabel,
            children,
            defaultCollapsed,
            labelClick,
            active,
            ...rest
        } = this.props;

        let arrowClassName = 'tree-view_arrow';
        let containerClassName = 'tree-view_children';
        if (collapsed) {
            arrowClassName += ' tree-view_arrow-collapsed';
            containerClassName += ' tree-view_children-collapsed';
        }

        const arrow = (
            <div
                {...rest}
                className={className + ' ' + arrowClassName}
                onClick={this.handleClick}
            />
        );

        return (
            <div className={'tree-view ' + treeViewClassName}>
                <div className={`${itemClassName} tree-view_item ${active ? 'active' : ''}`} onClick={this.handleLabelClick}>
                    {arrow}
                    {nodeLabel}
                </div>
                <div className={containerClassName + ' ' + childrenClassName}>
                    {collapsed ? null : children}
                </div>
            </div>
        );
    }
}

export default TreeView;