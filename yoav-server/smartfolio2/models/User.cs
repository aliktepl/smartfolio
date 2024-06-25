namespace smartfolio2.models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<coin> coins { get; set; }


    }
}
