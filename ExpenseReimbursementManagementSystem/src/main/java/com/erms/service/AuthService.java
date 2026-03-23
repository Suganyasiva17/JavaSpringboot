//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final EmployeeRepo employeeRepo;
//
//    public CustomUserDetailsService(EmployeeRepo employeeRepo) {
//        this.employeeRepo = employeeRepo;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Employee emp = employeeRepo.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        return User.withUsername(emp.getEmail())
//                .password(emp.getPwd())              // PWD FROM ENTITY
//                .roles(emp.getRole().name())         // ROLE ENUM
//                .build();
//    }
//
//    public Employee getEmployeeByEmail(String email) {
//        return employeeRepo.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//    }
//}