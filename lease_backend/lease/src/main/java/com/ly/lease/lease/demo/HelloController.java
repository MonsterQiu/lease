package com.ly.lease.lease.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/") // 定义根路径的 GET 请求映射
    public String hello() {
        System.out.println("Inside hello() method!");
        return "Hello, Spring Boot!"; // 返回字符串作为响应
    }
}
