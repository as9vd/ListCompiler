public class Player implements Comparable<Player> {
    String name;
    String nation;
    int votes;

    public Player(String name, String nation, int votes) {
        this.name = name;
        this.nation = nation;
        this.votes = votes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    @Override
    public String toString() {
        return this.name + ": " + this.nation + " (" + this.votes + ")";
    }

    @Override public int compareTo(Player o) {
        if (this.votes > o.votes) {
            return -1;
        } else if (this.votes < o.votes) {
            return 1;
        }

        return 0;
    }
}
