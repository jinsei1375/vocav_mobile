using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;
using Newtonsoft.Json;

namespace Api.Models.Entities
{
  [Table("vocab")]
  public class Vocab : BaseModel
  {
    public Vocab() {}

    [PrimaryKey("id", false)]
    [Column("id")]
    [JsonProperty("id")]
    public long Id { get; set; } 

    [Column("user_id")]
    [JsonProperty("user_id")]
    public Guid User_Id { get; set; } = Guid.Empty;

    [Column("word")]
    [JsonProperty("word")]
    public string Word { get; set; } = string.Empty;

    [Column("meaning")]
    [JsonProperty("meaning")]
    public string Meaning { get; set; } = string.Empty;

    [Column("created_at")]
    [JsonProperty("created_at")]
    public DateTime Created_At { get; set; }

    [Column("updated_at")]
    [JsonProperty("updated_at")]
    public DateTime Updated_At { get; set; }
  }

  [Table("vocab")]
  public class AddVocab : BaseModel
  {
    public AddVocab() {}
    // ここの整理
    [PrimaryKey("id", false)]
    // [Column("id")]　Column属性つけると、Supabaseのテーブルにidがないとエラーになる
    [JsonProperty("id")]
    public long Id { get; set; }
    
    [Column("user_id")]
    [JsonProperty("user_id")]
    public Guid User_Id { get; set; } = Guid.Empty;

    [Column("word")]
    [JsonProperty("word")]
    public string Word { get; set; } = string.Empty;

    [Column("meaning")]
    [JsonProperty("meaning")]
    public string Meaning { get; set; } = string.Empty;

    [Column("created_at")]
    [JsonProperty("created_at")]
    public DateTime Created_At { get; set; }

    [Column("updated_at")]
    [JsonProperty("updated_at")]
    public DateTime Updated_At { get; set; }
  }

  [Table("vocab")]
  public class UpdateVocab : BaseModel
  {
    public UpdateVocab() {}

    [PrimaryKey("id", false)]
    [Column("id")]
    [JsonProperty("id")]
    public long Id { get; set; } 

    [Column("word")]
    [JsonProperty("word")]
    public string Word { get; set; } = string.Empty;

    [Column("meaning")]
    [JsonProperty("meaning")]
    public string Meaning { get; set; } = string.Empty;

    [Column("updated_at")]
    [JsonProperty("updated_at")]
    public DateTime Updated_At { get; set; }
  }
}
