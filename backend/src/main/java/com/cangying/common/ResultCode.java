package com.cangying.common;

import lombok.Getter;

/**
 * 响应码枚举
 *
 * @author qingming
 */
@Getter
public enum ResultCode {

    /**
     * 成功
     */
    SUCCESS(200, "操作成功"),

    /**
     * 失败
     */
    FAIL(500, "操作失败"),

    /**
     * 参数错误
     */
    PARAM_ERROR(400, "参数错误"),

    /**
     * 未授权
     */
    UNAUTHORIZED(401, "未授权，请先登录"),

    /**
     * 禁止访问
     */
    FORBIDDEN(403, "禁止访问"),

    /**
     * 资源不存在
     */
    NOT_FOUND(404, "资源不存在"),

    /**
     * 用户不存在
     */
    USER_NOT_FOUND(1001, "用户不存在"),

    /**
     * 登录失败
     */
    LOGIN_FAILED(1002, "登录失败"),

    /**
     * Token 无效
     */
    TOKEN_INVALID(1003, "Token 无效或已过期"),

    /**
     * 馆子不存在
     */
    RESTAURANT_NOT_FOUND(2001, "馆子不存在");

    /**
     * 响应码
     */
    private final Integer code;

    /**
     * 响应消息
     */
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}