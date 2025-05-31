import os

def rename_sprites(folder_path, new_names):
    """
    Renames files in a specified folder based on a provided list of new names.

    Args:
        folder_path (str): The path to the folder containing the sprites.
        new_names (list): A list of new names for the sprites.
                          The order of names in this list will correspond to
                          the alphabetical order of the original files.
    """
    if not os.path.isdir(folder_path):
        print(f"Error: Folder not found at '{folder_path}'")
        return

    # Get all files in the folder, excluding directories
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    files.sort() # Sort files alphabetically to ensure consistent renaming

    if len(files) != len(new_names):
        print(f"Error: Number of files ({len(files)}) does not match "
              f"the number of new names ({len(new_names)}).")
        print("Please ensure the count matches for accurate renaming.")
        return

    print(f"Found {len(files)} files in '{folder_path}'.")
    print(f"Will rename them using {len(new_names)} new names.")
    print("-" * 30)

    for i, old_file_name in enumerate(files):
        # Construct the full old file path
        old_file_path = os.path.join(folder_path, old_file_name)

        # Get the file extension (e.g., .png, .jpg)
        file_name_without_ext, file_extension = os.path.splitext(old_file_name)

        # Get the new name from the list and append the original extension
        new_file_name = new_names[i] + file_extension
        new_file_path = os.path.join(folder_path, new_file_name)

        try:
            os.rename(old_file_path, new_file_path)
            print(f"Renamed '{old_file_name}' to '{new_file_name}'")
        except OSError as e:
            print(f"Error renaming '{old_file_name}': {e}")

    print("-" * 30)
    print("Renaming process completed!")

# The list of new names you provided
sprite_new_names = [
    "reimuhakurei", "marisakirisame", "rumia", "daiyousei", "cirno", "cirnotanned",
    "hongmeiling", "koakuma", "patchouliknowledge", "sakuyaizayoi", "remiliascarlet",
    "flandrescarlet", "lettywhiterock", "chen", "alicemargatroid", "lilywhite",
    "lunasaprismriver", "merlinprismriver", "lyricaprismriver", "youmukonpaku",
    "yuyukosaigyouji", "ranyakumo", "yukariyakumo", "suikaibuki", "wrigglenightbug",
    "mystialorelei", "keine", "keinehakutaku", "tewiinaba", "reiseninaba",
    "eirinyagokoro", "kaguyahouraisan", "fujiwaranomokou", "ayashameimaru",
    "medecinemelancholy", "yuukakazami", "komachionozuka", "eikishiki", "shizuhaaki",
    "minorikoaki", "hinakagiyama", "nitorikawashiro", "momijiinubashiri",
    "sanaekochiya", "kanakoyasaka", "suwakomoriya", "ikunagae", "tenshihinanawi",
    "kisume", "yamamekurodani", "parseemizuhashi", "yuugihoshiguma", "satorikomeiji",
    "rinkaenbyou", "utsuhoreiuji", "koishikomeiji", "nazrin", "kogasatatara",
    "ichirinkumoi", "ichirin&unzan", "minamitsumurasa", "shoutoramaru",
    "byakurenhijiri", "nuehoujuu", "hatatehimekaidou", "sunnymilk", "lunachild",
    "starsapphire", "kyoukokasodani", "yoshikamiyako", "seigakaku", "soganotojiko",
    "mononobenofuto", "toyosatomiminomiko", "mamizoufutatsuiwa", "kasenibaraki",
    "hatanokokoro", "wakasagihime", "sekibanki", "kagerouimaizumi", "benbentsukumo",
    "yatsuhashitsukumo", "seijakijin", "shinmyoumarusukuna", "raikohorikawa",
    "sumirekousami", "seiran", "ringo", "doremysweet", "sagumekishin", "clownpiece",
    "junko", "hecatiaotherworld", "hecatiaearth", "hecatiamoon", "joonyorigami",
    "shionyorigami", "eternitylarva", "nemunosakata", "aunnkomano", "narumiyatadera",
    "maiteireida", "satononishida", "okinamatara", "eikaebisu", "urumiushizaki",
    "kutakaniwatari", "yachiekicchou", "mayumijoutouguu", "keikihaniyasushin",
    "sakikurokuma", "yuumatoutetsu", "mikegotoukuji", "takaneyamashiro",
    "sannyokomakusa", "misumarutamatsukuri", "tsukasakudamaki", "megumuiinzumaru",
    "chimatatenkyuu", "momoyohimemushi", "sonbiten", "enokomitsugashira",
    "chiyaritenkajin", "hisamiyomotsu", "zanmunippaku", "vivit"
]

if __name__ == "__main__":
    # Prompt the user for the folder path
    folder_path_input = input("Please enter the full path to your sprite folder: ")

    # Call the function to rename the sprites
    rename_sprites(folder_path_input, sprite_new_names)
