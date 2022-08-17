// import React from 'react';
import styles from './Form.module.scss';

import * as React from 'react';
// import './Form.css';
// import { CardsStateForm, IObjDataForm, IPropsForm } from '../../interface/interface';
export class Form extends React.Component<any, any> {
  private refForm: React.RefObject<HTMLFormElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Date: '',
      Area: '',
      Skills: '',
      Position: '',
      File: '',
      About: '',
      Submit: true,
      SavedDataText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.refForm = React.createRef<HTMLFormElement>();
  }

  validateForm(objDataForm: any) {
    let validateFlag = true;

    const reName = /^[a-zA-Z_.-]{2,30}$/;
    const reEmail = /^[a-zA-Z_.-@]{5,30}$/;
    const reDate = /^[0-9.-]{8,10}$/;
    const reArea = /^[a-zA-Z]{3,7}$/;
    const reSkills = /^[a-zA-Z]{5,}$/;
    const rePosition = /^[a-zA-Z]{4,9}$/;

    if (!reName.test(objDataForm.name)) {
      validateFlag = false;
      this.setState({ Name: '* name should contain only letters' });
    }
    if (!reEmail.test(objDataForm.email)) {
      validateFlag = false;
      this.setState({ Email: '* email should be fill' });
    }
    if (!reDate.test(objDataForm.date)) {
      validateFlag = false;
      this.setState({ Date: '* date should be fill' });
    }
    if (!reArea.test(objDataForm.area)) {
      validateFlag = false;
      this.setState({ Area: '* area should be selected' });
    }
    if (!reSkills.test(objDataForm.language.join(''))) {
      validateFlag = false;
      this.setState({ Skills: '* skills should be selected' });
    }
    if (!rePosition.test(objDataForm.position)) {
      validateFlag = false;
      this.setState({ Position: '* position should be selected' });
    }
    if (!objDataForm.photo) {
      validateFlag = false;
      this.setState({ File: '* photo should be selected' });
    }
    if (!objDataForm.message) {
      validateFlag = false;
      this.setState({ About: '* about me should be fill' });
    }
 
    return validateFlag;
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const language = this.refForm.current?.Skills;
    let checkedCheckboxesValues = [];
    if (language) {
      const checkboxArray = Array.prototype.slice.call(language);
      const checkedCheckboxes = checkboxArray.filter((input) => input.checked);
      checkedCheckboxesValues = checkedCheckboxes.map((input) => input.value);
    }

    const file: Blob = this.refForm.current!.File?.files![0];
    function loadFile(file: Blob) {
      if (file) {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = function (event) {
            const data = event.target?.result;
            resolve(data);
          };
          reader.readAsDataURL(file);
        });
      }
    }

    const objDataForm = {
      name: this.refForm.current!.Name?.value,
      email: this.refForm.current!.Email?.value,
      date: this.refForm.current!.Date?.value,
      area: this.refForm.current!.Area?.value,
      language: checkedCheckboxesValues,
      position: this.refForm.current!.Position?.value,
      photo: await loadFile(file),
      message: this.refForm.current!.About?.value,
    };

    if (this.validateForm(objDataForm)) {
      this.props.addCard(objDataForm);

      this.setState({ SavedDataText: 'data saved successfully!' });
      this.refForm.current?.reset();
      this.refForm.current!.Area!.value = '';
      this.setState({ Submit: false });
    } else {
      this.setState({ Submit: true });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const name: string = event.target.name;
    this.setState({ [name]: '' });
    this.setState({ SavedDataText: '' });
    let errorFlag = 0;
    Object.values(this.state).forEach((value) => {
      if (value !== '' && value !== true && value !== false) {
        errorFlag += 1;
      }
    });
    if (errorFlag) {
      this.setState({ Submit: true });
    } else {
      this.setState({ Submit: false });
    }
  };

  render() {
    return (
      <form
        className="decor"
        onSubmit={this.handleSubmit}
        ref={this.refForm}
        onChange={this.handleChange}
      >
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          <h1>Company employees</h1>
          <h3>
            Name: <span className="validate Name">{this.state.Name}</span>
          </h3>
          <input type="text" placeholder="Username" name="Name" />
          <h3>
            Email: <span className="validate Email">{this.state.Email}</span>
          </h3>
          <input type="email" placeholder="Email" name="Email" />
          <h3>
            Date start job: <span className="validate Date">{this.state.Date}</span>
          </h3>
          <input type="date" placeholder="Date" name="Date" />
          <label htmlFor="area">
            <h3>
              Area: <span className="validate Area">{this.state.Area}</span>
            </h3>
          </label>
          <select id="area" className="select" name="Area">
            <option className="select-option" value="Belarus">
              Belarus
            </option>
            <option className="select-option" value="USA">
              USA
            </option>
            <option className="select-option" value="Germany">
              Germany
            </option>
            <option className="select-option" value="Remote">
              Remote
            </option>
          </select>
          <div>
            <div className="content">
              <span className="validate Skills">
                {this.state.Skills}
                <br />
                {this.state.Position}
              </span>
              <div className="dpx">
                <div className="px">
                  <h3>Skills:</h3>
                  <label>
                    <input
                      type="checkbox"
                      className="option-input checkbox"
                      name="Skills"
                      value="JavaScript"
                    />
                    <p>JavaScript</p>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="option-input checkbox"
                      name="Skills"
                      value="React"
                    />
                    <p>React</p>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="option-input checkbox"
                      name="Skills"
                      value="NodeJS"
                    />
                    <p>NodeJS</p>
                  </label>
                </div>
                <div className="py">
                  <h3>Position:</h3>
                  <label>
                    <input
                      type="radio"
                      className="option-input radio"
                      name="Position"
                      value="FrontEnd"
                    />
                    <p>FrontEnd</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="option-input radio"
                      name="Position"
                      value="BackEnd"
                    />
                    <p>BackEnd</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="option-input radio"
                      name="Position"
                      value="FullStack"
                    />
                    <p>FullStack</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="files">
            <h3>
              Photo: <span className="validate File">{this.state.File}</span>
            </h3>
          </label>
          <input type="file" id="files" name="File" />
          <h3>
            About me: <span className="validate About">{this.state.About}</span>
          </h3>
          <textarea placeholder="Message..." name="About"></textarea>
          <input type="submit" value="SEND" disabled={this.state.Submit} />
        </div>
        <p className="savedDataText">{this.state.SavedDataText}</p>
      </form>
    );
  }
}
