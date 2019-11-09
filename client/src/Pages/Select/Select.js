import React from 'react'
// const { string, arrayOf, shape } = PropTypes
import './select.css'
class Select extends React.Component {
  constructor(props) {
      super(props)
  }
    render() {
    return (
      <div className="dropdown" style={{ 
         display: this.props.open ? 'flex' : 'none', 
        }}>
        {
          this.props.options ? this.props.options.map((element, index)=>{
            return(
              <div className="dropdown-items"
                onClick={(e)=>{this.props.getUserId(e)}}
                id={element._id} 
                style={{
                  overflowY: this.props.options.length > 5 ?  'scroll' : 'none' 
                }}                
                >{element.name}
              </div>
            )
          })
          : (
            <div>
              <span>Add Friends to Select them</span>
            </div>
          )
        }
      </div>
    )
  }
}

export default Select
