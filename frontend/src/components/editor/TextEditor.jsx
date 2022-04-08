import React, {useState, useEffect, useMemo, useCallback} from "react";
import {Editor, Transforms, createEditor} from "slate";
import {useSlate, Slate, withReact, Editable} from 'slate-react';
import {ToggleButton, Paper, ToggleButtonGroup, Divider, FormControl} from '@mui/material';
import {withHistory} from 'slate-history';
import isHotkey from 'is-hotkey';
import {
    FormatBold, FormatItalic, FormatUnderlined, Code, LooksOne,
    LooksTwo, FormatQuote, FormatListNumbered, List
} from '@mui/icons-material';

export const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const SlateElement = (props) => {
    const {attributes, children, element} = props;
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "link":
            return (
                <a {...attributes} href={element.url}>
                    {children}
                </a>
            );
        default:
            return <p {...attributes}>{children}</p>;
    }
};

export const SlateLeaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format
    });
    return !!match;
};

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
        const block = {type: format, children: []};
        Transforms.wrapNodes(editor, block);
    }
};

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const BlockButton = ({format, icon}) => {
    const editor = useSlate();
    return (
        <ToggleButton
            value={format}
            selected={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </ToggleButton>
    );
};

const MarkButton = ({format, icon}) => {
    const editor = useSlate();
    return (
        <ToggleButton
            value={format}
            selected={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon}
        </ToggleButton>
    );
};

export const SlateToolbar = () => {
    return (
        <Paper elevation={2}>
            <ToggleButtonGroup
                size="small"
                arial-label="text formatting"
                sx={{display: 'flex', flexWrap: "wrap", border: 'none'}}
            >
                {MarkButton({format: "bold", icon: <FormatBold/>})}
                {MarkButton({
                    format: "italic",
                    icon: <FormatItalic/>,
                })}
                {MarkButton({
                    format: "underline",
                    icon: <FormatUnderlined/>,
                })}
                {MarkButton({
                    format: "code",
                    icon: <Code/>,
                })}
                {BlockButton({format: "heading-one", icon: <LooksOne/>})}
                {BlockButton({format: "heading-two", icon: <LooksTwo/>})}
                {BlockButton({
                    format: "block-quote",
                    icon: <FormatQuote/>,
                })}
                {BlockButton({
                    format: "numbered-list",
                    icon: <FormatListNumbered/>,
                })}
                {BlockButton({
                    format: "bulleted-list",
                    icon: <List/>,
                })}
            </ToggleButtonGroup>
            <Divider orientation="vertical" />
        </Paper>
    );
};

export const HoveringToolbar = () => {
    const editor = useSlate();
    const [showToolbar, setShowToolbar] = useState(false);
    const {selection} = editor;
    useEffect(() => {
        if (!selection || Editor.string(editor, selection) === "") {
            setShowToolbar(false);
        } else {
            setShowToolbar(true);
        }
    }, [selection]);

    return (
        <div hidden={!showToolbar}>
            <SlateToolbar/>
        </div>
    );
};

const TextEditor = (props) => {
    const [value, setValue] = useState(props.value);
    const editor = useMemo(
        () => withHistory(withReact(createEditor())),
        []
    );

    const renderElement = useCallback((props) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, []);

    return (
        <>
            <FormControl
                fullWidth={true}
            >
                <Paper elevation={2}>
                    <Slate
                        editor={editor}
                        value={value}
                        onChange={props.onChange}
                    >
                        {/*(value) => {*/}
                        {/*    setValue(value);*/}
                        {/*    setValue(JSON.stringify(value));*/}
                        {/*}*/}
                        <SlateToolbar/>
                        <Editable
                            renderLeaf={renderLeaf}
                            renderElement={renderElement}
                            onKeyDown={(event) => {
                                for (const hotkey in HOTKEYS) {
                                    if (isHotkey(hotkey, event)) {
                                        event.preventDefault();
                                        const mark = HOTKEYS[hotkey];
                                        toggleMark(editor, mark);
                                    }
                                }
                            }}
                            style={{minHeight: 300, margin: 20}}
                        />
                    </Slate>
                </Paper>
            </FormControl>
        </>
    );
}

export default TextEditor;

// https://sushilkbansal.medium.com/customising-slate-js-part-1-adding-material-ui-c98568951258
