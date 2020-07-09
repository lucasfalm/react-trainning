import React, { Component } from 'react'
import Button from '../components/Button'
import Display from '../components/Display'

import './Calculator.css'

class Calculator extends Component {
    state = {
        total: '',
        equation: '',
        flag: false,
        leftHand: '',
        rightHand: ''
    }

    setEquationType = (equationType) => { 
        let total = makeCalc(this.state.leftHand, this.state.rightHand, this.state.equation)
        
        if(this.state.flag) {
            // flag is always true, there is no runtime to change it
            total += this.state.total
            this.prepareOperation(false, total, equationType)
        } else {
            this.prepareOperation(true, this.state.total, equationType)
            return
        }
    }
    
    prepareOperation = (status, total, equationType) => { 
        this.setState({
            total: total,
            flag: status,
            equation: equationType,
        })
    }

    increment = (value) => {     
        if(this.state.flag) { 
            let actual = this.state.rightHand
            this.setState({ rightHand: actual + value })
        } else {
            let actual = this.state.leftHand
            this.setState({ leftHand: actual + value })
        }
    }

    total = () => { 
        let total = makeCalc(this.state.leftHand, this.state.rightHand, this.state.equation)
        return (
            this.setState({ 
                total:  total,
                leftHand: total,
                rightHand: '',
                equation: ''
            })
        )
    }

    clear = () => { this.setState({ total: 0, equation: '', flag: false, leftHand: '', rightHand: ''})}

    render() { 
        return(
            <div className="calculator">
               <Display total= { this.state.total } leftHand={ this.state.leftHand } equation={ this.state.equation }  rightHand={ this.state.rightHand }/>
               <Button column="true" label="AC" click={ this.clear }  />
               <Button label="-" click={ this.setEquationType } />
               <Button label="+" click={ this.setEquationType } />
               <Button label="1" click={ this.increment } />
               <Button label="2" click={ this.increment } />
               <Button label="3" click={ this.increment } />
               <Button label="*" click={ this.setEquationType } />
               <Button label="4" click={ this.increment } />
               <Button label="5" click={ this.increment } />
               <Button label="6" click={ this.increment } />
               <Button label="/" click={ this.setEquationType } />
               <Button label="7" click={ this.increment } />
               <Button label="8" click={ this.increment } />
               <Button label="9" click={ this.increment } />
               <Button label="%" click={ this.increment } />
               <Button label="0" click={ this.increment } />
               <Button label="." click={ this.increment } />
               <Button column="true" label="=" click={ this.total } />
            </div>
        )
    }     
}
export default Calculator

function makeCalc(left, right, expression) { 
    let result = 0
    let avaliableExpressions = ['-', '+', '*', '/']

    for(var expressionIndex = 0; expressionIndex <= avaliableExpressions.length; expressionIndex++) { 
        if(expression === avaliableExpressions[expressionIndex]) { 
            switch(expressionIndex) {
                case 0:
                    result = parseInt(left) - parseInt(right)
                    break
                case 1:
                    result =  parseInt(left) + parseInt(right)
                    break
                case 2:
                    result =  parseInt(left) * parseInt(right)
                    break  
                case 3:
                    result =  parseInt(left) / parseInt(right)
                    break
            }
        }
    }
    return result
}