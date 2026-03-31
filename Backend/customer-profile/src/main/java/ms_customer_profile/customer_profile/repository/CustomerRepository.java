package ms_customer_profile.customer_profile.repository;

import ms_customer_profile.customer_profile.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByRut(String rut);
    Optional<Customer> findByEmail(String email);
}