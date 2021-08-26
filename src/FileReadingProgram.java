import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.util.List;

public class FileReadingProgram {
    public static void main(String[] args) throws IOException, InterruptedException {
        String line;

        BufferedReader fr = new BufferedReader(new FileReader("/Users/asadbekshamsiev/Desktop/JavaScraping/FootballerLists/80sCombinedFootballerList.txt"));
        FileWriter fileWriter = new FileWriter("WorldFootball.json");

        fileWriter.write("{");

        while ((line = fr.readLine()) != null) {
            String[] parts = line.split(": ");

            System.out.println(line);

            fileWriter.write("\n" + "\t");
            fileWriter.write(" \"" + parts[0] + "\": {"); // Writes player name.

            fileWriter.write("\n" + "\t \t");
            fileWriter.write("\"nation\":" + " \"" + parts[1].split(" \\(")[0] + "\","); // Writes player nation.

            fileWriter.write("\n" + "\t \t");
            fileWriter.write("\"votes\":" + " \"" + findPlayerVotes(parts[0]) + "\","); // Writes player votes.

//            fileWriter.write("\n" + "\t \t");
//            fileWriter.write("\"wiki\":" + " \"" + "|| THIS IS FILLER ||" + "\","); // Writes player Wikipedia link.

            fileWriter.write("\n" + "\t \t");
            fileWriter.write("\"wf\":" + " \"" + "|| THIS IS FILLER ||" + "\""); // Writes player WorldFootball link.

            fileWriter.write( "\n \t" + "}, "); // Ends line.
        }

        fileWriter.write("]" + "\n" + "}");

        fileWriter.close();
    }

    public static int findPlayerVotes(String name) throws IOException {
        BufferedReader fr = new BufferedReader(new FileReader("/Users/asadbekshamsiev/Desktop/JavaScraping/FootballerLists/80sCombinedFootballerList.txt"));

        String line;

        while ((line = fr.readLine()) != null) {
            if (line.contains(name)) {
                return Integer.parseInt(line.split(" \\(")[1].replace(")", ""));
            }
        }

        return 0;
    }

    public static void getPlayerLinks(String name) throws InterruptedException, IOException {
//        String url = "https://www.google.com/search?q=" + name;
//        String charset = "UTF-8";

//        Document document = Jsoup.connect(url).get();

//        Element element = document.select("div[]");

//        System.out.println(document.outerHtml());

//        System.setProperty("webdriver.chrome.driver", "/Users/asadbekshamsiev/Desktop/JavaScraping/libraries/chromedriver");
//        WebDriver driver = new ChromeDriver();
//
//        driver.get("https://www.google.com/search?q=" + name);
//
//        Thread.sleep(2000);
//
//        WebElement query = driver.findElement(By.xpath("//*[@id=\"rso\"]/div[1]"));
//
//        WebDriverWait wait = new WebDriverWait(driver, 5000);
//
//        System.out.println(driver.getTitle());
    }

}
