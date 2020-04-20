import React,{Component} from 'react'
import {connect} from 'react-redux'
import BlogItem from './BlogItem'
import {fetchBlogList} from '../../actions/actionBlog'

class BlogList extends Component {
 
  componentDidMount(){
    this.props.fetchBlogList();
  }
 
  render() {
    console.log(this.props);
    const {isLoading,list} = this.props
    return (
      <div>
        {
          isLoading
            ?
            <div>loading</div>
            :
            list.map(item => {
              return <BlogItem {...item} key={item.id}></BlogItem>
            })

        }

      </div>
    )
  }
}
const mapStateToProps = (state,ownProps) => {
  return {
    list: state.blog.list,
    isLoading: state.blog.isLoading,
    msg: state.blog.msg
  }
}
export default connect(mapStateToProps,{ fetchBlogList })(BlogList)
