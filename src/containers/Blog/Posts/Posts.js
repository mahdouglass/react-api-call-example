import React, { Component } from 'react';
import axios from '../../../axios';
import { Link, Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    axios.get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'Test'
            }
        })
        this.setState({posts: updatedPosts});
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Could not load posts</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Link to={'/' + post.id} key={post.id} >
          <Post 
            title={post.title} 
            author={post.author} 
            clicked={() => this.postSelectedHandler(post.id)}
          />
          </Link>;
      });
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;