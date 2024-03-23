import { UserModel } from '../model/user'

export const getUsers = async () => {
  await UserModel.find()
}

export const getUserWithEmail = (email: string) => UserModel.findOne({ email })

export const getUserBySessionToken = async (sessionToken: string) =>
  await UserModel.findOne({
    'authentication.token': sessionToken,
  })

export const getUserById = async (id: string) => {
  await UserModel.findById(id)
}

export const createUser = (values: Record<string, any>) =>
  UserModel.create(values)

export const deleteUserById = async (id: string) => {
  await UserModel.findOneAndDelete({ _id: id })
}

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  await UserModel.findOneAndUpdate({ _id: id }, values)
}
