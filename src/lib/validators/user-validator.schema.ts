import * as yup from "yup";

const UserValidatorSchema = {
  RegisterUser: yup.object({
    first_name: yup.string().trim().required(),
    last_name: yup.string().trim().required(),
    password: yup.string().trim().min(8).required(),
    email: yup.string().lowercase().email().trim().required(),
    phone_number: yup.string().trim().matches(/^\d{6,13}$/).required()
  }),
  LoginUser: yup.object({
    email: yup.string().lowercase().email().trim().required(),
    password: yup.string().trim().required()
  })
}

export default UserValidatorSchema;

