class Boxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namev: "",
      value: "",
      circleId: "",
      cancel: true,
    };
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleColourCircle = this.handleColourCircle.bind(this);
    this.handleColourDraw = this.handleColourDraw.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseDraw = this.handleMouseDraw.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleResetColour = this.handleResetColour.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
  handleColourCircle(e) { 
    e.preventDefault();
     let heldCircle = e.target.getAttribute("id");
     //console.log(heldCircle);
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let colr =  "#" + ("000000" + hex.toString(16)).substr(-6);
    e.target.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${colr}, ${colr}, ${colr})`;
    e.target.style.boxShadow = `1px 1px 22px 3px ${colr}, 0px 0px 6px 1px ${colr}`;
    this.setState({
      value: colr,
      circleId: heldCircle,
      });
    }
  
  handleColourDraw(e) {
    e.preventDefault();
    let drawArray = [];
    let draw = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (draw.className === "pixel") {
      drawArray.push(draw);
   //console.log(draw.getAttribute("id"));
  draw.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${this.state.value}, ${this.state.value}, ${this.state.value})`;
  draw.style.boxShadow = `1px 1px 22px 3px ${this.state.value}, 0px 0px 6px 1px ${this.state.value}`;
    }
  }
  
  handleMouseDraw(e) {
    if (typeof e.cancelable !== 'boolean' || e.cancelable !== this.state.cancel) {
    e.preventDefault();
    let drawArray = [];
    let draw = document.elementFromPoint(e.clientX, e.clientY);
    if (draw.className === "pixel") {
      drawArray.push(draw);
   //console.log(draw.getAttribute("id"));
   draw.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${this.state.value}, ${this.state.value}, ${this.state.value})`;
   draw.style.boxShadow = `1px 1px 22px 3px ${this.state.value}, 0px 0px 6px 1px ${this.state.value}`;
     } 
    }
  }
  
  handleMouseUp(e) {
    //console.log("mouse click up");
     e.preventDefault();
    this.setState({
      cancel: true,
      value: "",
    });
  }
  
  handleMouseDown(e) {
     this.handleColourCircle(e);
    //console.log("mouse click down");
     e.preventDefault();
    this.setState({
      cancel: false,
    });
  }
  
  handleDoubleClick(e) {
    e.preventDefault();
    //console.log("double clicked!");
    e.target.style.background = "none";
    e.target.style.boxShadow = "none";
  }
  
  handleMouseOut(e) {
    //console.log("mouse moved out!")
    e.defaultPrevented();
    this.setState({
     value: "",
    });
  }
  
   handleTouchEnd(e) {
     e.preventDefault();
  }
  
  handleReset(e) {
    const getCircles = document.getElementsByClassName("pixel");
    for (let colour of getCircles) {
      colour.style.background = "none";
      colour.style.boxShadow = "none";
    } 
  }
   handleResetColour(e) {
     //console.log(this.state.circleId);
     const getCircle = document.getElementById(this.state.circleId);
     //console.log(getCircle);
     getCircle.style.background = "none";
     getCircle.style.boxShadow = "none";
     this.setState({
       circleId: "",
     });
   }
 
  render() {
      let draw = [];
      for(let i = 0; i <513; i++){
        draw.push(<div 
            className="pixel" 
            value={i} key={i} id={i}
            onTouchStart={this.handleColourCircle}
            onDoubleClick={this.handleDoubleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            >
            </div>)
     }
    return (
      <div className="wrapper" onMouseUp={this.handleMouseUp}>
      <div className="container">
      <div className="heading">
        <h1>Light-bright Colour Changing Circles</h1>
        <button onClick={this.handleResetColour}>RESET COLOUR</button>
        <button onClick={this.handleReset}>RESET ALL</button>
        </div>
      <div className="boxes" id="litebrite"
        onTouchMove={this.handleColourDraw}
        onMouseMove={this.handleMouseDraw}
        onMouseUp={this.handleMouseUp}
        >
       {draw}
        </div>
      </div>
        <section>
          <p>Desktop: Click and move mouse to light circles.</p>
          <p>Desktop: Double Click to remove colour from a circle.</p>
          <p>Desktop and Touch: Click/Touch to change colour of a circle.</p>
          <p>Touch: Touch and move finger on device to light circles.</p>
          <p>All: Click "RESET COLOUR" button to remove a colour touch or click.</p>
          <p>All: Click "RESET ALL" button to remove colours from all circles.</p>
          <h2>Thank you for playing!</h2>
        </section>
     </div>
    );
  }
}

ReactDOM.render(
  <Boxes />,
  document.getElementById('root')
);
