import * as Yup from 'yup'

// yup схема для регистрации
export type SignupFormType = {
  firstName: string
  lastName: string
  email: string
  telegramm: string
  password: string
  password_repeat: string
}

export const SignupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(20, 'Слишком длинное!')
    .required('Поле обязательное'),
  lastName: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(20, 'Слишком длинное!')
    .required('Поле обязательное'),
  email: Yup.string().email('Неверный формат').required('Поле обязательное'),
  telegramm: Yup.string().min(4, 'Минимум 4 символов').max(20, 'Максимум 20 символов'),
  password: Yup.string()
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательное'),
  password_repeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароль должен совпадать')
    .required('Поле обязательное'),
})

// yup схема для логина
export type SigninFormType = {
  email: string
  password: string
}

export const SigninSchema = Yup.object({
  email: Yup.string().email('Неверный формат').required('Поле обязательное'),
  password: Yup.string()
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательное'),
})

// yup схема для продаж
export type SalesFormType = {
  quantity: number
  description: string
  profit: number
}

export const SalesSchema = Yup.object({
  quantity: Yup.number().min(1, 'Минимум 1 символ').required('Поле обязательное'),
  profit: Yup.number().min(1, 'Минимум 1 символов').required('Поле обязательное'),
  description: Yup.string().min(5, 'Минимум 5 символов'),
})

// yup схема для должностей
export type JobsFormType = {
  name: string
  comment: string
}

export const JobsSchema = Yup.object({
  name: Yup.string().min(4, 'Минимум 4 символа').required('Поле обязательное'),
  comment: Yup.string().min(5, 'Минимум 5 символов'),
})

// yup схема для смены пароля
export type ChangePasswordFormType = {
  currentPassword: string
  password: string
  password_repeat: string
}

export const ChangePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательное'),
  password: Yup.string()
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательное'),
  password_repeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароль должен совпадать')
    .required('Поле обязательное'),
})

// yup схема для смены email и имени
export type ChangeEmailFormType = {
  firstName: string
  email: string
}

export const ChangeEmailSchema = Yup.object({
  firstName: Yup.string().min(2, 'Слишком короткое!').max(20, 'Слишком длинное!'),
  email: Yup.string().email('Неверный формат'),
})

// yup схема для смены задача
export type TaskFormType = {
  title: string
  description: string
}

export const TaskSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(20, 'Слишком длинное!')
    .required('Поле обязательно'),
  description: Yup.string().min(2, 'Слишком короткое!'),
})

// yup схема для смены записок
export type NoteFormType = {
  title: string
}

export const NoteSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(20, 'Слишком длинное!')
    .required('Поле обязательно'),
})

// yup схема для страниц сео
export type SeoFormType = {
  title: string
  description: string
  keyword: string
}

export const SeoSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  description: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  keyword: Yup.string().required('Поле обязательное'),
})

// yup схема для блога
export type BlogFormType = {
  title: string
  name: string
  seoTitle: string
  seoDescription: string
  seoKeyword: string
}

export const BlogSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  name: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .trim('Не может быть пробелов')
    .matches(/^[a-z0-9.,_@%&?+=/-]*$/, 'Введите корректный URL')
    .required('Поле обязательное'),
  seoTitle: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
  seoDescription: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
  seoKeyword: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
})

// yup схема для страниц маркета карда
export type MarketCardFormType = {
  title: string
  name: string
  version: string
  price: string
  seoTitle: string
  seoDescription: string
  seoKeyword: string
}

export const MarketCardSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  name: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .trim('Не может быть пробелов')
    .matches(/^[a-z0-9.,_@%&?+=/-]*$/, 'Введите корректный URL')
    .strict(true)
    .required('Поле обязательное'),
  version: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  price: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  seoTitle: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
  seoDescription: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
  seoKeyword: Yup.string().min(2, 'Слишком короткое!').max(100, 'Слишком длинное!'),
})

// yup схема для страниц файлов
export type FilesCardFormType = {
  title: string
}

export const FilesCardSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
})

// yup схема для графика
export type GraphicFormType = {
  title: string
  instrument: string
  drawdown: string
  profit_1: string
  profit_3: string
  profit_6: string
  profit_12: string
}

export const GraphicSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  instrument: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  drawdown: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
  profit_1: Yup.number()
    .typeError('Только число')
    .required('Поле обязательное'),
  profit_3: Yup.number()
    .typeError('Только число')
    .required('Поле обязательное'),
  profit_6: Yup.number()
    .typeError('Только число')
    .required('Поле обязательное'),
  profit_12: Yup.number()
    .typeError('Только число')
    .required('Поле обязательное'),
})

// yup схема для orders
export type OrderFormType = {
  activations: string
  accountNumber: string
  comment: string
  payment: string
}

export const OrderSchema = Yup.object({
  activations: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
    accountNumber: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(100, 'Слишком длинное!')
    .required('Поле обязательное'),
    comment: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(200, 'Слишком длинное!')
    .required('Поле обязательное'),
    payment: Yup.string()
    .required('Поле обязательное'),
})