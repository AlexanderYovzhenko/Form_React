import * as React from 'react';
import './Form.css';


const Form = () => {
  const [userName, setUserName] = React.useState('');

  const validUserName = () => {
    let arrNames = [];
    userName.includes(' ')
    

    const reName = /^[a-zA-Z]{3,30}$/;
    if (!reName.test(userName)) {
      
    }
  };
  

  return (
    <section>
      <form
        className="decor"
        // onSubmit={this.handleSubmit}
        // ref={this.refForm}
        // onChange={this.handleChange}
      >
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          <h1>Форма обратной связи</h1>
          <input 
            type="text" 
            placeholder="Имя Фамилия" 
            name="Name" 
            value={userName} 
            onChange={(input) => {
              setUserName(input.target.value.toUpperCase())
              validUserName()
            }} 
          />
          <input type="email" placeholder="E-mail" name="Email" />
          <input type="tell" placeholder="Номер телефона" name="Phone" />
          <input type="date" placeholder="Дата рождения" name="Date" />
          <textarea placeholder="Сообщение" name="Message"></textarea>
          <input type="submit" value="SEND" disabled={false} />
        </div>
        <p className="savedDataText">{
        // this.state.SavedDataText
        }</p>
      </form>
    </section>
  );
};

export default Form;
