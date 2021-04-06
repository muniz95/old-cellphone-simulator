export const getContacts = (): Contact[] => {
  return [
    { name: "Teste 1", number: "111-1111" },
    { name: "Teste 2", number: "222-2222" },
    { name: "Teste 3", number: "333-3333" },
    { name: "Teste 4", number: "444-4444" },
    { name: "Teste 5", number: "555-5555" },
  ]
}

const service = {
  getContacts,
}

export default service;