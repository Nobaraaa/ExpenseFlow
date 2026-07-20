
package com.project.expenseflow.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.expenseflow.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}