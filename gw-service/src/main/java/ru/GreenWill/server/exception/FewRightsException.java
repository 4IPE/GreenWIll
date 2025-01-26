package ru.GreenWill.server.exception;

public class FewRightsException extends RuntimeException {
    public FewRightsException(String message) {
        super(message);
    }
}
