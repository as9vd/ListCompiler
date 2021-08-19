import java.util.ArrayList;

public class DecadeFootballers {
    public ArrayList<Player> list60s = new ArrayList<>();
    public ArrayList<Player> list70s = new ArrayList<>();
    public ArrayList<Player> list80s = new ArrayList<>();
    public ArrayList<Player> list90s = new ArrayList<>();

    public boolean add(ArrayList<Player> list, Player newPlayer) {
        for (Player player: list) {
            if (player.getName().equals(newPlayer.getName())) {
                player.setVotes(player.getVotes() + newPlayer.getVotes());
                return true;
            }
        }
        list.add(newPlayer);

        return true;
    }

    public ArrayList<Player> getList60s() {
        return list60s;
    }

    public ArrayList<Player> getList70s() {
        return list70s;
    }

    public ArrayList<Player> getList80s() {
        return list80s;
    }

    public ArrayList<Player> getList90s() {
        return list90s;
    }

}
