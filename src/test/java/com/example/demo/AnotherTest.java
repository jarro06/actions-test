package com.example.demo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AnotherTest {

	@Test
	void testPassed() {
		Assertions.assertTrue(true);
	}

	@Test
	void testFailed() {
		Assertions.assertTrue(false);
	}

	@Test
	void testException() {
		throw new RuntimeException();
	}
}
