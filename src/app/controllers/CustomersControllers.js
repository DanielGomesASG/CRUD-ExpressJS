const customers = [
  { id: 1, name: "Google", site: "http://google.com" },
  { id: 2, name: "UOL", site: "http://uol.com.br" },
  { id: 3, name: "Amazon", site: "http://amazon.com" }
];

class CustomersController {
  // Lista os Customers
  index(req, res) {
    return res.json(customers);
  }

  // Recupera um Customer
  show(req, res) {
    const id = parseInt(req.params.id);
    const customer = customers.find((item) => item.id === id);
    const status = customer ? 200 : 404;

    console.debug("GET :: /customers/:id ", customer);

    return res.status(status).json(customer);
  }

  // Cria um novo Customer
  create(req, res) {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, site };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
  }

  // Atualiza um Customer
  update(req, res) {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id: parseInt(id), name, site };
    }

    return res.status(status).json(customers[index]);
  }

  // Exclui um Customer
  destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json();
  }
}

export default new CustomersController();
