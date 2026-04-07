package com.cangying;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 苍蝇小馆后端服务启动类
 *
 * @author qingming
 */
@SpringBootApplication
@MapperScan("com.cangying.mapper")
public class CangyingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CangyingApplication.class, args);
    }
}