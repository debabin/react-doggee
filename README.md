# 🐕 REACT DOGGEE

Делаем веб сервис DOGGEE с помощью библиотеки reactjs. DOGGEE 🐕 - это веб сервис для собаководов и любителей собак. Цель данных стримов получение опыта работы с разными и актуальными веб технологиями 2022 года.

Данный репозиторий является результатом стримов по reactjs. Все стрим по данному репозито можно посмотреть тут в данном [плейлисте](https://youtube.com/playlist?list=PL_trBE0sVQmd3SjxZJcsvPPeIqPnyyh6w). В данном репозитории можно найти только страницу авторизации и регистрации.

Конфигурация проекта:

- Create React App + craco
- Eslint Airbnb TS
- Typescript
- Prettier
- React (Hooks)

В данном репозитории можно найти кастомные реализации:

> Возможно баги или недоработки. Лично на стримах просто хотелось попробовать и реализовать свои вариации веб решений.

- **Fetch Api Class** (src/utils/api) - класс для работы с rest api, использует fetch
- **i18n** (src/utils/intl) - инструмент для работы с i18n в реакт приложениях
- **Theming (CSS Variables)** - (src/features/theming + src/static/theme) - изменение темы приложения с помощью React Context + CSS global variables
- **Hooks**
  - **useForm** (src/hooks/form) - hook для удобной работы с состоянием формы
  - **useMutation, useQuery, useQueryLazy** (src/hooks/api) - hooks для удобной работы с rest api внутри компонентов
- **Components/UI kit**
  - **Input, Button**
  - **Calendar** - календарь реализованый с использованием js date api
- **CSS MODULES + Adaptive** - использовались css модули + полностью сделан адаптив
