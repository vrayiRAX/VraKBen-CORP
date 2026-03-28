package ms_job_orders.job_orders.controller;

import ms_job_orders.job_orders.model.JobOrder;
import ms_job_orders.job_orders.service.JobOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/job-orders")
public class JobOrderController {
    @Autowired
    private JobOrderService service;

    @PostMapping("/start")
    public JobOrder startJob(@RequestBody JobOrder order) {
        return service.createOrder(order);
    }

    @PutMapping("/complete/{id}")
    public JobOrder finishJob(@PathVariable Long id) {
        return service.completeOrder(id);
    }
}