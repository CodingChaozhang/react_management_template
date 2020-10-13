import React from 'react';
import {Card,Button,Modal} from 'antd';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            editorState:"",
            showRichText:false
        };
    }
    onContentStateChange=(contentChange)=>{
        this.setState({
            contentChange,
        })
    }
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState,
        })
    }

    handleClearContent=()=>{
        this.setState({
            editorState:'',
        })
    }

    handleGetText=()=>{
        this.setState({
            showRichText:true
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft:10}}>获取HTML文本</Button>
                </Card>
                <Card className="card-wrap" title="富文本编辑器">
                    <Editor
                        editorState={this.state.editorState}
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftToHtml(this.state.contentChange)}
                </Modal>
            </div>
        );
    }
}

export default index;