import argparse
import sys

from PIL import Image

def merge(i, j):
    """
        Merges top 4 bits of i with top 4 bits of j
        such that if i = aaaabbbb, j = ccccdddd,
        merge(i, j) = aaaacccc
    """
    assert 0 <= i and i < 256 and 0 <= j and j < 256, 'i: {}, j: {}'.format(i, j)
    return (i & 240) + (j >> 4)

def recover(i):
    """
        Recovers the 4 lower bits of i as the top
        4 bits of a new int, such that i = aaaabbbb,
        recover(i) = bbbb0000
    """
    assert 0 <= i and i < 256, 'i: {}'.format(i)
    return (i & 15) << 4

def merge_rgb(rgb1, rgb2):
    return tuple(merge(i, j) for i, j in zip(rgb1, rgb2))

def recover_rgb(rgb):
    return tuple(recover(i) for i in rgb)

def encode(img1, img2):
    assert img1.size == img2.size, 'Size not the same! {} vs {}'.format(img1.size, img2.size)
    
    pix1, pix2 = img1.load(), img2.load()

    new_img = Image.new(img1.mode, img1.size)
    pix_new = new_img.load()

    for i in range(img1.size[0]):
        for j in range(img1.size[1]):
            pix_new[i, j] = merge_rgb(pix1[i,j], pix2[i,j])

    return new_img

def decode(img):
    pix = img.load()

    new_img = Image.new(img.mode, img.size)
    pix_new = new_img.load()

    for i in range(img.size[0]):
        for j in range(img.size[1]):
            pix_new[i, j] = recover_rgb(pix[i, j])
    
    return new_img

def main():
    parser = argparse.ArgumentParser('Encode or decode images obscured using stenography')
    parser.add_argument('--img1', type=str, required=True, help='Path of img1')
    parser.add_argument('--img2', type=str, required=False, help='Path of img2')
    parser.add_argument('--out' , type=str, required=True, help='Output Path')
    args = parser.parse_args()

    if args.img2:
        img = encode(Image.open(args.img1), Image.open(args.img2))
        img.save(args.out)
        print('Encoded image at {}'.format(args.out))
    else:
        img = decode(Image.open(args.img1))
        img.save(args.out)
        print('Decoded image at {}'.format(args.out))

if __name__ == '__main__':
    main()
