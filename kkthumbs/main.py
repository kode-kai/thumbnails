

import click

from PIL import Image, ImageDraw
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path


MAIN_FONT_PATH = str(Path( Path(__file__).parent, "Knewave", "Knewave-Regular.ttf"))
SECONDARY_FONT_PATH = str(Path( Path(__file__).parent, "Montserrat", "Montserrat-SemiBold.ttf"))



THEMES = {
    "light": {
        "background_color": '#f8e71c',
        "foreground_color": "#b50218"
    }
}

@click.command()
@click.argument('filename', type=click.Path(dir_okay=False))
@click.argument('title', type=click.STRING)
@click.option('-w', '--width', type=click.INT, default=1920)
@click.option('-h', '--height', type=click.INT, default=1080)
@click.option('-t', '--theme', type=click.STRING, default='light')
def generate(filename, title, width, height, theme):
    background_color = THEMES[theme]['background_color']
    foreground_color = THEMES[theme]['foreground_color']

    center_width = width / 2
    center_heigth = height / 2
    img = Image.new('RGB', (width, height), background_color)

    main_font = ImageFont.truetype(MAIN_FONT_PATH, 400)
    secondary_font = ImageFont.truetype(SECONDARY_FONT_PATH, 200)
    d = ImageDraw.Draw(img)
    d.text((center_width, center_heigth -  250), "kode kai", font=main_font, anchor="mm", fill=foreground_color)

    # draw text, half opacity
    title_to_draw = title
    size = d.multiline_textsize(title_to_draw, font=secondary_font)

    resize_attempts = 10
    attempt = 0
    starting_font_size= 200
    while size[0] >= width - 50 and attempt < resize_attempts:
        secondary_font = ImageFont.truetype(SECONDARY_FONT_PATH, starting_font_size)

        splits = title.split(' ')
        mid = len(splits) // 2
        part1 =  " ".join(splits[:mid])
        part2 =  " ".join(splits[mid:])
        title_to_draw = part1 + "\n" + part2
        size = d.multiline_textsize(title_to_draw, font=secondary_font)

        starting_font_size -= 10
        resize_attempts += 1

    d.multiline_text((center_width, center_heigth + 200), title_to_draw, anchor="mm", align='center',  font=secondary_font, fill=foreground_color)

    img.save(filename)

if __name__ == '__main__':
    generate()
