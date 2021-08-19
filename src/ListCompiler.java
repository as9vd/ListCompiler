import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collections;

public class ListCompiler {
    public static void main(String[] args) throws IOException {
        DecadeFootballers footballerCollection = new DecadeFootballers();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        JsonNode node = mapper.readValue(new File("/Users/asadbekshamsiev/Desktop/JavaScraping/60sFootballers.json"), JsonNode.class);
        JsonNode array = node.get("data");

        for (JsonNode player: array) {
            String name = player.get("name").asText();
            String nation = player.get("nation").asText();
            Integer votes = player.get("votes").asInt();

            footballerCollection.add(footballerCollection.list80s, new Player(name, nation, votes));
        }

        Collections.sort(footballerCollection.list80s);

        JsonGenerator g = mapper.getFactory().createGenerator(new FileOutputStream(new File("./60sCombinedFootballerList.txt")));

        for (Player player: footballerCollection.list60s) {
            System.out.println(player);
            mapper.writeValue(g, player);
        }
    }

}
