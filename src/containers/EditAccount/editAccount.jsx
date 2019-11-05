/* eslint-disable no-undef */
// import React, { Component } from 'react';

// import { Form, Input, Icon, Button, Checkbox } from 'antd';
// import PropTypes from 'prop-types';

// import Header from '../../components/Header';
// import './editAccount.css';

// class EditAccount extends Component {
//   state = {
//     checked: false,
//     info: { name: 'Fares', email: 'fares@gmail.com' },
//   };

//   onChange = e => {
//     this.setState({
//       checked: e.target.checked,
//     });
//   };

//   render() {
//     const {
//       checked,
//       info: { email, name },
//     } = this.state;

//     const {
//       form: { getFieldDecorator, validateFieldsAndScroll },
//       history: { goBack },
//     } = this.props;

//     const handleSubmit = e => {
//       e.preventDefault();
//       validateFieldsAndScroll((err, values) => {
//         if (!err) {
//           // eslint-disable-next-line no-console
//           console.log('Received values of form: ', values);
//         }
//       });
//     };
//     return (
//       <div className="edit-account">
//         <Header text="Edit Account" handleBack={goBack} />

//         <section className="edit-account__form">
//           <Form onSubmit={handleSubmit}>
//             <Form.Item hasFeedback>
//               {getFieldDecorator('name', {
//                 initialValue: `${name}`,
//                 rules: [
//                   {
//                     required: true,
//                     message: 'Please input your Name!',
//                   },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="user" className="edit-account__icon" />}
//                   placeholder="Name"
//                 />
//               )}
//             </Form.Item>

//             <Form.Item hasFeedback>
//               {getFieldDecorator('email', {
//                 initialValue: `${email}`,

//                 rules: [
//                   {
//                     type: 'email',
//                     message: 'The input is not valid E-mail!',
//                   },
//                   {
//                     required: true,
//                     message: 'Please input your E-mail!',
//                   },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="mail" className="edit-account__icon" />}
//                   placeholder="Email"
//                 />
//               )}
//             </Form.Item>

//             <section className="edit-account__checkbox">
//               <Checkbox checked={checked} onChange={this.onChange}>
//                 Change Password
//               </Checkbox>
//             </section>

//             <Form.Item
//               hasFeedback
//               className={checked ? 'transition' : 'transition hidden'}
//             >
//               {getFieldDecorator('password', {
//                 rules: [
//                   {
//                     required: checked,
//                     message: 'Enter your password',
//                   },
//                 ],
//               })(
//                 <Input.Password
//                   prefix={<Icon type="lock" className="edit-account__icon" />}
//                   placeholder="Password"
//                 />
//               )}
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Save Changes
//               </Button>
//             </Form.Item>
//           </Form>
//         </section>
//       </div>
//     );
//   }
// }

// const editAccount = Form.create({ name: 'Edit Account' })(EditAccount);

// EditAccount.propTypes = {
//   form: PropTypes.shape({
//     validateFieldsAndScroll: PropTypes.func.isRequired,
//     getFieldValue: PropTypes.func.isRequired,
//     getFieldDecorator: PropTypes.func.isRequired,
//   }).isRequired,
//   history: PropTypes.shape({
//     goBack: PropTypes.func.isRequired,
//   }).isRequired,
// };

// export default editAccount;

import React from 'react';

import { Form, Input, Icon, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import './editAccount.css';

const EditAccount = props => {
  const {
    info: { name },
  } = props;
  const email = 'Fares@gmail.com';
  const checked = false;

  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
    history: { goBack },
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('Received values of form: ', values);
      }
    });
  };
  return (
    <div className="edit-account">
      <Header text="Edit Account" handleBack={goBack} />

      <section className="edit-account__form">
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              initialValue: `${name}`,
              rules: [
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" className="edit-account__icon" />}
                placeholder="Name"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              initialValue: `${email}`,

              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" className="edit-account__icon" />}
                placeholder="Email"
              />
            )}
          </Form.Item>

          <section className="edit-account__checkbox">
            <Checkbox checked={checked} onChange={onChange}>
              Change Password
            </Checkbox>
          </section>

          <Form.Item
            hasFeedback
            className={checked ? 'transition' : 'transition hidden'}
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: checked,
                  message: 'Enter your password',
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" className="edit-account__icon" />}
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

const editAccount = Form.create({ name: 'Edit Account' })(EditAccount);

EditAccount.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default editAccount;
