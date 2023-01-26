import React, { useState, useEffect } from "react";
import APIService from './APIService';

function Form(props){
    const [title, setTitle] = useState(props.article.title);
    const [body, setBody] = useState(props.article.body);

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, body})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, body})
        .then(resp => props.insertedArticle(resp))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        setTitle(props.article.title);
        setBody(props.article.body)
    }, [props.article])
    return(
        <div>
            {props.article && (
                <div className="mb-3">
                    <label htmlFor = 'title' className="form-label">Title</label>
                    <input type='text' className="form-control" placeholder="Please type Title" 
                        value={title} onChange={(e) => setTitle(e.target.value)}></input>

                    <label htmlFor = 'Body' className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Please type Des" rows={"5"}
                        onChange={(e) => setBody(e.target.value)} value={body}>{body}</textarea>
                    {props.article.id ? (
                        <button className="btn btn-success mt-3" onClick={() => updateArticle()}>Update</button>
                    ) : (
                        <button className="btn btn-success mt-3" onClick={() => insertArticle()}>Insert</button>
                    )}
                    
                </div>
            )}
        </div>
    )
}

export default Form;