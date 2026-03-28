package ms_customer_profile.customer_profile.controller;

import ms_customer_profile.customer_profile.model.Customer;
import ms_customer_profile.customer_profile.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService service;

    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return service.saveCustomer(customer);
    }

    @GetMapping("/profile/{rut}")
    public Customer getProfile(@PathVariable String rut) {
        return service.getCustomerByRut(rut);
    }
}
