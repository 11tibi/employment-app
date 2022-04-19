import escapeHtml from 'escape-html'
import {Text} from 'slate'
import parse from 'html-react-parser';

export const Serialize = (obj) => {
    let text = '';
    for (let i=0; i<obj.length; i++) {
        text += (SerializeNode(obj[i]));
    }
    return parse(text);
}

const SerializeNode = (node) => {
    const children = node.children.map(n => SerializeFormat(n)).join('')

    switch (node.type) {
        case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'heading-one':
            return `<h1>${children}</h1>`
        case 'heading-two':
            return `<h2>${children}</h2>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'numbered-list':
            return `<ol>${SerializeList(node.children)}</ol>`
        case 'bulleted-list':
            return `<ul>${SerializeList(node.children)}</ul>`
        default:
            return children
    }
}

const SerializeList = (node) => {
    let text = ''
    for (let i=0; i<node.length; i++) {
        text += `<li>${SerializeFormat(node[i].children[0])}</li>`
    }
    return text
}

const SerializeFormat = (node) => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        if (node.italic) {
            string = `<i>${string}</i>`
        }
        if (node.underline) {
            string = `<u>${string}</u>`
        }
        if (node.code) {
            string = `<code>${string}</code>`
        }
        return string
    }
}
