package ms_customer_profile.customer_profile.service;

import ms_customer_profile.customer_profile.model.Customer;
import ms_customer_profile.customer_profile.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository repository;

    public Customer saveCustomer(Customer customer) {
        return repository.save(customer);
    }

    public Customer getCustomerByRut(String rut) {
        return repository.findByRut(rut)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }
}