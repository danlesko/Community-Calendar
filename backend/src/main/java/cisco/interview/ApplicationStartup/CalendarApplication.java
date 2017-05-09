package cisco.interview.ApplicationStartup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;


@Import(AppConfig.class)
@SpringBootApplication(scanBasePackages={"cisco.interview.ApplicationStartup", "cisco.interview.Events"})
public class CalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(CalendarApplication.class, args);
	}
}
